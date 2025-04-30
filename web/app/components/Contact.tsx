import Link from 'next/link';
import Section from './common/Section';

export default function Contact() {
  return (
    <Section id="contact" title="連絡先">
      <div className="contact-content">
        <p>以下の方法でご連絡いただけます。お気軽にお問い合わせください。</p>
        <div className="contact-methods">
          <div className="contact-method">
            <i className="fas fa-envelope"></i>
            <h3>Email</h3>
            <p>naoya@example.com</p>
          </div>
          <div className="contact-method">
            <i className="fab fa-github"></i>
            <h3>GitHub</h3>
            <Link href="https://github.com/naoya" target="_blank">github.com/naoya</Link>
          </div>
          <div className="contact-method">
            <i className="fab fa-twitter"></i>
            <h3>Twitter</h3>
            <Link href="https://twitter.com/naoya" target="_blank">@naoya</Link>
          </div>
        </div>
        <div className="contact-form">
          <h3>お問い合わせフォーム</h3>
          <form id="contactForm">
            <div className="form-group">
              <label htmlFor="name">お名前</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">メールアドレス</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">メッセージ</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="btn primary">送信</button>
          </form>
        </div>
      </div>
    </Section>
  );
}
