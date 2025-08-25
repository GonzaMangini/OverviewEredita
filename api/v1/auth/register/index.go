package handler

import (
	"encoding/json"
	"net/http"

	"api/lib/db"
	jwtu "api/lib/jwt"
	"api/lib/models"
)

type registerRequest struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type authResponse struct {
	User  models.UserResponse `json:"user"`
	Token string              `json:"token"`
}

// Handler: POST /api/v1/auth/register
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var req registerRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Datos inválidos"})
		return
	}

	dbConn := db.Connect()
	_ = dbConn.AutoMigrate(&models.User{})

	var existing models.User
	if err := dbConn.Where("email = ?", req.Email).First(&existing).Error; err == nil {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]string{"error": "El email ya está registrado"})
		return
	}

	user := models.User{
		Email:     req.Email,
		Password:  req.Password,
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Role:      "user",
	}
	if err := dbConn.Create(&user).Error; err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Error al crear el usuario"})
		return
	}

	token, err := jwtu.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Error al generar el token"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(authResponse{User: user.ToResponse(), Token: token})
}
