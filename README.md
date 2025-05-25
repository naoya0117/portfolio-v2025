# Portfolio Website

This is a portfolio website built with Next.js and WordPress. The website includes a blog section that fetches content from WordPress and a contact form that uses the Contact Form 7 plugin.

## Project Structure

- `web/`: Next.js frontend application
- `wp/`: WordPress installation
- `api/`: API-related code
- `dev-docker/` and `prd-docker/`: Docker configurations for development and production

## Contact Form Configuration

The contact form uses the Contact Form 7 plugin in WordPress. To configure the contact form:

1. Make sure the Contact Form 7 plugin is installed and activated in WordPress.
2. Create a new form in the WordPress admin panel under Contact > Contact Forms.
3. Note the form ID (it will be displayed in the shortcode, e.g., `[contact-form-7 id="123" title="Contact form 1"]`).
4. Set the form ID in the environment variable `NEXT_PUBLIC_CF7_FORM_ID` or update the code in `web/app/hooks/useContactForm.ts`.

### Form Field Names

The contact form expects the following field names in the Contact Form 7 form:

- `your-name`: For the name field
- `your-email`: For the email field
- `your-message`: For the message field

Example Contact Form 7 form:

```
<label>お名前 (required)
    [text* your-name]
</label>

<label>メールアドレス (required)
    [email* your-email]
</label>

<label>メッセージ
    [textarea your-message]
</label>

[submit "送信"]
```

## Development

To run the development server:

```bash
docker-compose up
```

The Next.js application will be available at http://localhost:3000 and the WordPress installation at http://localhost:8080.