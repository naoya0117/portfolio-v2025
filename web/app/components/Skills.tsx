import Section from './common/Section';

export default function Skills() {
  return (
    <Section id="skills" title="技術経験">
      <div className="skills-content">
        <div className="skill-category">
          <h3>主要スキル</h3>
          <div className="skill-item">
            <div className="skill-info">
              <h4>Linux</h4>
              <p>学部1年生の冬からシェルに興味を持ち自分のメインPCにインスト−ル。開発環境やデスクトップ環境をいじりながら、シェル操作や設定ファイルの基礎を学んだ。ArchLinuxを愛用している。</p>
            </div>
            <div className="skill-progress">
              <div className="progress-bar" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <h4>Docker</h4>
              <p>学部3年時にweb開発を始めたことがきっかけで入門。いろんな場面で広く利用しており、学部4年時はDockerをテーマとした卒業研究に取り組んだ。</p>
            </div>
            <div className="skill-progress">
              <div className="progress-bar" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <h4>Nginx</h4>
              <p>webアプリを公開する際のwebサーバとして利用。また、保有するVPS上で複数のアプリケーションを公開するためのリバースプロキシにも利用。</p>
            </div>
            <div className="skill-progress">
              <div className="progress-bar" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <h4>Kubernetes</h4>
              <p>修士1年の春から入門。OSS(Helm Chart)や自作アプリケーションのデプロイを行った。ディストリビューションはk3s。修論テーマとして検討中。</p>
            </div>
            <div className="skill-progress">
              <div className="progress-bar" style={{ width: '70%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <h4>React (Javascript, Typescript)</h4>
              <p>学部3年生時にweb開発を始めたことがきっかけで入門。静的アプリの開発を学んだ。</p>
            </div>
            <div className="skill-progress">
              <div className="progress-bar" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <h4>Laravel (PHP)</h4>
              <p>学部3年生の冬から今に至るまでインターンシップ先の業務にて利用。MVCモデルやバックエンドの基礎を学んだ。</p>
            </div>
            <div className="skill-progress">
              <div className="progress-bar" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="skill-item">
            <div className="skill-info">
              <h4>MySQL</h4>
              <p>web開発で広く利用。SQL操作やトランザクションについて学習。</p>
            </div>
            <div className="skill-progress">
              <div className="progress-bar" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
        <div className="skill-category">
          <h3>その他のスキル</h3>
          <p>授業や研究でそれなりに利用:</p>
          <div className="skill-tags">
            <span className="skill-tag">C</span>
            <span className="skill-tag">Java</span>
            <span className="skill-tag">Spring Boot</span>
            <span className="skill-tag">FastAPI</span>
            <span className="skill-tag">PostgreSQL</span>
          </div>
          <p>学習中・興味のある技術:</p>
          <div className="skill-tags">
            <span className="skill-tag">Go</span>
            <span className="skill-tag">Web Assembly</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
