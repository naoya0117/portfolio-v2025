import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>&copy; 2025 Naoya - All Rights Reserved</p>
        <div className="social-links">
          <Link href="#" target="_blank"><i className="fab fa-github"></i></Link>
          <Link href="#" target="_blank"><i className="fab fa-twitter"></i></Link>
          <Link href="#" target="_blank"><i className="fab fa-linkedin"></i></Link>
        </div>
      </div>
    </footer>
  );
}