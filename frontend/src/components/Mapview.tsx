import React, { useState } from 'react';
import { JapanMap } from './JapanMap';
import { Prefectures, Checkpoint } from '../data/Prefectures';

interface Player {
  currentCheckpoint: number;
  points: number;
}

export const MapView: React.FC = () => {
  const [player, setPlayer] = useState<Player>({
    currentCheckpoint: 1, // 北海道からスタート
    points: 0,
  });
  const movePlayer = (steps: number) => {
    setPlayer((prev) => {
      const newPrefectureId = prev.currentCheckpoint + steps;
      const nextPrefecture =
        newPrefectureId > Prefectures.length
          ? Prefectures.length
          : newPrefectureId;

      handleEvent(nextPrefecture);

      return { ...prev, currentPrefecture: nextPrefecture };
    });
  };

  const handleEvent = (prefectureId: number) => {
    const currentPrefecture = Prefectures.find((p: Checkpoint) => p.id === prefectureId);
    if (!currentPrefecture) return;

    switch (currentPrefecture.event) {
      case 'goal':
        alert(`${currentPrefecture.name}: ゴール！おめでとうございます！`);
        break;
      default:
        console.log(`${currentPrefecture.name}: 通常のマスです。`);
    }
  };

  return (
      <div>
        <h1>日本地図ゲーム</h1>
        <p>
          現在地: {Prefectures.find((p: Checkpoint) => p.id === player.currentCheckpoint)?.name}
        </p>
        <JapanMap
            currentPrefectureId={player.currentCheckpoint}
            onClickPrefecture={(name) => alert(`選択された都道府県: ${Prefectures.find((p: Checkpoint) => p.id === player.currentCheckpoint)?.name}`)}
        />
      </div>

  );
};

export default MapView;