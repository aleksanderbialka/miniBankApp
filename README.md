
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

### Panel administratora
Panel administratora pozwala na zarządzanie użytkownikami, transakcjami oraz innymi elementami systemu. Oto, jak możesz z niego skorzystać:

Aby zalogować się do panelu administratora, musisz najpierw utworzyć superużytkownika. Wykonaj poniższe polecenie:

```bash
docker-compose exec web python manage.py createsuperuser
```
Następnie należy zalogować się na utworzone konto, a w górnym panelu ukaże się zakładka **Panel administratora**.

### Wybrane zrzuty ekranu aplikacji:
<img width="1440" alt="Zrzut ekranu 2024-10-22 o 00 07 07" src="https://github.com/user-attachments/assets/622f51f7-6803-4199-b56a-aced488c20dd">

<img width="1440" alt="Zrzut ekranu 2024-10-22 o 00 07 15" src="https://github.com/user-attachments/assets/647b6158-b922-461b-b9d9-18c59cf75848">
<img width="1440" alt="Zrzut ekranu 2024-10-22 o 00 08 16" src="https://github.com/user-attachments/assets/08d2a72e-27fb-4252-a8d2-b3e4e65a146f">
<img width="1440" alt="Zrzut ekranu 2024-10-22 o 00 09 32" src="https://github.com/user-attachments/assets/b792e75c-6e0e-4c0e-86e4-3dbbe18535ed">
<img width="1440" alt="Zrzut ekranu 2024-10-22 o 00 08 35" src="https://github.com/user-attachments/assets/c8911b39-1ab5-418a-92c3-67a6b618b5d2">

