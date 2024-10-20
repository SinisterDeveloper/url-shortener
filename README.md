# url-shortener

## Overview

This is a Python Flask application that shortens URL and hosts it, similar to `bit.ly`. 

## Prerequisites

Before you begin, ensure you have the following installed:

- `Python 3.x` (You can download it from Python's official website)
- `pip` (Python package manager)

## Installation

1) **Clone the repository**

```bash
git clone https://github.com/SinisterDeveloper/url-shortener.git
```

2) **Navigate to the project directory:**

```bash
cd url-shortener
```

3) **Install the dependencies:**

```bash
pip install -r requirements.txt
```

4) **Run the Application**

```bash
python -m flask run
```

After running this command, the application will be available at `http://127.0.0.1:5000/panel`

## Configuration

You can choose to run the application on a different host. When running on a custom public domain, make sure you open `app.py` and modify the `BASE_URL` variable to match your domain (Defaulte to `http://localhost:5000`)

## License

This program is licensed under the MIT License
