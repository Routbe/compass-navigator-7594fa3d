# Repository import verification

Source: https://github.com/Routbe/compass-navigator-95457000.git (main). Owner permission confirmed. Imported source directly, not a website capture. Source website comparison is not applicable; repository design and handlers preserved.

Preview: http://localhost:8080

- desktop /: QR input https://example.com/import-check; QR rendered; PNG downloaded (rout-example-com-qr-png-20261101-162513.png); navigation menu opened; no horizontal overflow; evidence /tmp/browser/repository-import/desktop-*.png.
- phone /: QR input https://example.com/import-check; QR rendered; PNG downloaded (rout-example-com-qr-png-20261101-162523.png); navigation menu opened; no horizontal overflow; evidence /tmp/browser/repository-import/phone-*.png.

- Public /, /qr, /auth/sign-in, /docs loaded without browser page errors.
- Route, QR and documentation tests: 17 passed. Manual tsgo check passed after automatic timeout.
- Account sign-in, provider OAuth, payments, email, storage and full route coverage remain unverified. Dedicated auth secret and origin settings were absent. No database scripts were applied and no account mutations performed.
