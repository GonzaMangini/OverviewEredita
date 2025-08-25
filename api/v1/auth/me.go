//go:build ignore

package main

import (
	"encoding/json"
	"net/http"

	"api/internal/auth"
	"api/internal/db"
	jwtu "api/internal/jwt"
	"api/internal/models"
)

// Handler: GET /api/v1/auth/me
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	token := auth.GetBearerToken(r)
	if token == "" {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "No autorizado"})
		return
	}
	claims, err := jwtu.ValidateJWT(token)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]string{"error": "Token inválido"})
		return
	}

	dbConn := db.Connect()
	var user models.User
	if err := dbConn.First(&user, claims.UserID).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Usuario no encontrado"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user.ToResponse())
}
