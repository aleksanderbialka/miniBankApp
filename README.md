
# Aplikacja MiniBank

Aplikacja MiniBank to prosty system bankowy, który umożliwia zarządzanie użytkownikami, kontami i transakcjami. Projekt jest w pełni konteneryzowany przy użyciu Dockera, co umożliwia łatwe uruchomienie i rozwój.

## Technologie
- **Backend**: Django, Django REST Framework
- **Frontend**: React, JavaScript
- **Baza danych**: PostgreSQL
- **Konteneryzacja**: Docker, Docker Compose

## Jak uruchomić projekt

### Wymagania
- Zainstalowany [Docker](https://docs.docker.com/get-docker/) oraz [Docker Compose](https://docs.docker.com/compose/install/)

### Krok 1: Klonowanie repozytorium
W terminalu sklonuj repozytorium i przejdź do katalogu projektu:

```bash
git clone https://github.com/aleksanderbialka/miniBankApp.git
cd miniBankApp
```

### Krok 2: Uruchomienie aplikacji
Zbuduj i uruchom kontenery Dockera (backend, frontend i baza danych):

```bash
docker-compose up --build
```

### Krok 3: Wykonanie migracji bazy danych
Uruchom migracje dla bazy danych (dla Django):

```bash
docker-compose exec web python manage.py migrate
```

### Krok 4: Dostęp do aplikacji
- Frontend (React): [http://localhost:3000](http://localhost:3000)
- Backend (Django): [http://localhost:8000](http://localhost:8000)


