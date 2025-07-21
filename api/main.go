package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"github.com/rs/cors"

	"github.com/naoya0117/portfolio-v2025-api/internal/database"
	"github.com/naoya0117/portfolio-v2025-api/internal/generated"
	"github.com/naoya0117/portfolio-v2025-api/internal/resolvers"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	// Initialize database connection
	db, err := database.NewConnection()
	if err != nil {
		log.Printf("Failed to connect to database: %v. Running with mock data.", err)
	} else if db != nil {
		log.Println("Successfully connected to database")
		
		// Create tables if they don't exist
		if err := db.CreateTables(); err != nil {
			log.Printf("Failed to create tables: %v", err)
		} else {
			log.Println("Database tables initialized")
		}
		
		defer db.Close()
	} else {
		log.Println("No database configuration found. Running with mock data.")
	}

	// Initialize resolver with database connection
	resolver := &resolvers.Resolver{
		DB: db,
	}

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: resolver}))

	router := mux.NewRouter()
	
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000", "http://localhost:3001"},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}