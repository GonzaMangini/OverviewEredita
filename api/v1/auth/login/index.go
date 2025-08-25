package main

import (
	"encoding/json"
	"net/http"

	"api/internal/db"
	jwtu "api/internal/jwt"
	"api/internal/models"
)

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Handler: POST /api/v1/auth/login
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "Datos inválidos"})
		return
	}

	dbConn := db.Connect()
	_ = dbConn.AutoMigrate(&models.User{})

	var user models.User
	if err := dbConn.Where("email = ?", req.Email).First(&user).Error; err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Credenciales inválidas"})
		return
	}
	if !user.IsActive || !user.CheckPassword(req.Password) {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Credenciales inválidas"})
		return
	}

	token, err := jwtu.GenerateJWT(user.ID, user.Email, user.Role)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Error al generar el token"})
		return
	}

	resp := struct {
		User  models.UserResponse `json:"user"`
		Token string              `json:"token"`
	}{User: user.ToResponse(), Token: token}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
