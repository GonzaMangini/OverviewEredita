package main

import (
	"encoding/json"
	"net/http"

	"api/internal/db"
	"api/internal/models"
)

// Handler serves GET /api/v1/products
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	dbConn := db.Connect()
	// Ensure schema exists (safe if already migrated)
	_ = dbConn.AutoMigrate(&models.Product{})

	category := r.URL.Query().Get("category")
	search := r.URL.Query().Get("search")

	var products []models.Product
	q := dbConn.Where("is_active = ?", true)
	if category != "" {
		q = q.Where("category = ?", category)
	}
	if search != "" {
		q = q.Where("name ILIKE ? OR description ILIKE ?", "%"+search+"%", "%"+search+"%")
	}
	if err := q.Find(&products).Error; err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]string{"error": "Error al obtener productos"})
		return
	}

	responses := make([]models.ProductResponse, len(products))
	for i := range products {
		responses[i] = products[i].ToResponse()
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responses)
}
