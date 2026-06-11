# IWSHA Foundation — PHP Website

A complete PHP website for IWSHA Foundation with admin panel. No separate frontend/backend — everything runs as standard PHP files.

## Folder Structure

```
phpcode/
├── index.php                  Homepage
├── programs.php               Programs & Universities
├── university.php             University detail (?slug=...)
├── scholarships.php           Scholarships hub
├── apply.php                  Scholarship application form
├── donate.php                 Donation page
├── contact.php                Contact page
│
├── admin/
│   ├── login.php              Admin login
│   ├── logout.php             Admin logout
│   ├── index.php              Redirect to dashboard
│   ├── dashboard.php          Admin dashboard
│   ├── universities.php       Add / delete universities
│   ├── form-builder.php       Manage form fields
│   ├── applications.php       View scholarship applications
│   └── messages.php           View contact messages
│
├── process/
│   ├── apply.php              Handles scholarship form POST
│   ├── contact.php            Handles contact form POST
│   └── donate.php             Handles donation form POST
│
├── includes/
│   ├── config.php             Site config, helpers (jsonRead/jsonWrite)
│   ├── auth.php               Admin session auth
│   ├── header.php             Public site header
│   ├── footer.php             Public site footer
│   ├── admin-sidebar.php      Admin layout (sidebar)
│   └── admin-footer.php       Admin layout close tags
│
├── data/                      JSON data storage
│   ├── universities.json      University listings
│   ├── form-config.json       Scholarship form fields
│   ├── applications.json      Submitted applications
│   └── messages.json          Contact & donation messages
│
├── assets/
│   ├── css/site.css           All styles (combined)
│   ├── js/main.js             Nav toggle, counters
│   └── img/iwsha-logo.png     Logo
│
└── .htaccess                  Security & directory protection
```

## Requirements

- PHP 8.0+
- Apache with `mod_rewrite` (or Nginx equivalent)
- Write permission on `data/` directory

## Setup

1. Copy `phpcode/` to your web server root (or a subdirectory)
2. Ensure `data/` is writable: `chmod 755 data/`
3. Visit `http://yourserver/phpcode/` to see the site
4. Visit `http://yourserver/phpcode/admin/login.php` for admin

## Admin Credentials

| Username | Password     |
|----------|--------------|
| admin    | iwsha@2024   |

> **Change the credentials** in `includes/config.php` before going live:
> ```php
> define('ADMIN_USERNAME', 'your_username');
> define('ADMIN_PASSWORD', 'your_secure_password');
> ```

## Data Storage

All data is stored in JSON files inside `data/`. To migrate to MySQL:
1. Replace `jsonRead()` and `jsonWrite()` in `includes/config.php` with PDO queries
2. No other changes needed — all pages use those two helper functions

## Admin Features

- **Universities** — Add custom universities (name, location, programs, requirements, fees, deadline). Default universities are protected from deletion.
- **Form Builder** — Enable/disable fields, reorder, add custom fields (text, number, email, tel, select, textarea). Changes apply live on the application form.
- **Applications** — View all scholarship applications, mark as reviewed, reply via email, delete.
- **Messages** — View contact form submissions and donation intents, mark as read.
