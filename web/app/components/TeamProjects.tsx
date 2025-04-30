import Section from './common/Section';
import Card from './common/Card';

export default function TeamProjects() {
  return (
    <Section id="team-projects" title="チーム開発経験">
      <div className="projects-grid">
        <Card
          title="MinecraftBotContest"
          tags={["Python"]}
          description="プログラミング初学者のための学内プログラミングコンテストの開発スタッフとして参加。キーボードをエミュレートし、C言語でマイクラのキャラを操作できる関数を作成。機能追加を3人チームで行った。"
        />
        <Card
          title="springboot-calendar-app"
          tags={["Java", "Spring Boot"]}
          description="学部3年の授業にて作成したユーザの予定を登録・削除・共有するためのカレンダーアプリ。4人チームで作成。授業内の評価で2位を獲得。"
        />
        <Card
          title="関西オデッセイ"
          tags={["React"]}
          description="2023年の学生ハッカソンイベントKC3Hack2023に参加。「関西をええかんじに」をテーマとした観光スポットを回りながらポイントを獲得するスタンプラリー形式のゲームを6人チームで作成。デイジイエル賞を受賞。"
        />
      </div>
    </Section>
  );
}
