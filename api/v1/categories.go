//go:build ignore

package main

import (
	"encoding/json"
	"net/http"

	"api/internal/db"
	"api/internal/models"
)

// Handler serves GET /api/v1/categories
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	dbConn := db.Connect()
	_ = dbConn.AutoMigrate(&models.Product{})

	var categories []string
	if err := dbConn.Model(&models.Product{}).
		Where("is_active = ? AND category <> ''", true).
		Distinct("category").
		Pluck("category", &categories).Error; err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Error al obtener categorías"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string][]string{"categories": categories})
}
