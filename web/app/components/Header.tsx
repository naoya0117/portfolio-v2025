import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1>Naoya&apos;s Portfolio</h1>
        <nav>
          <ul>
            <li><Link href="#about">自己紹介</Link></li>
            <li><Link href="#background">経歴</Link></li>
            <li><Link href="#skills">技術経験</Link></li>
            <li><Link href="#team-projects">チーム開発経験</Link></li>
            <li><Link href="#personal-projects">個人開発・趣味</Link></li>
            <li><Link href="#work-experience">実務経験</Link></li>
            <li><Link href="#blog">ブログ</Link></li>
            <li><Link href="#contact">連絡先</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
