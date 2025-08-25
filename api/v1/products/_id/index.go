package main

import (
	"encoding/json"
	"net/http"
	"path"
	"strconv"

	"api/internal/db"
	"api/internal/models"
)

// Handler serves GET /api/v1/products/:id
func Handler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	dbConn := db.Connect()
	_ = dbConn.AutoMigrate(&models.Product{})

	idStr := path.Base(r.URL.Path)
	id, err := strconv.Atoi(idStr)
	if err != nil || id <= 0 {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"error": "ID inválido"})
		return
	}

	var product models.Product
	if err := dbConn.Where("id = ? AND is_active = ?", id, true).First(&product).Error; err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(map[string]string{"error": "Producto no encontrado"})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(product.ToResponse())
}
