function calculateDistance(entityA, entityB) {
  const dx = entityA.x - entityB.x;
  const dy = entityA.y - entityB.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function isColliding(entityA, entityB) {
  const distance = calculateDistance(entityA, entityB);

  const radiusA = entityA.size / 2;
  const radiusB = entityB.size / 2;

  return distance < radiusA + radiusB;
}

function generateRandomPosition(maxWidth, maxHeight, margin = 70) {
  return {
    x: Math.floor(Math.random() * (maxWidth - margin * 2)) + margin,
    y: Math.floor(Math.random() * (maxHeight - margin * 2)) + margin,
  };
}

function generateSafePosition(maxWidth, maxHeight, size, avoidEntities = []) {
  for (let attempt = 0; attempt < 100; attempt++) {
    const position = generateRandomPosition(maxWidth, maxHeight);

    const candidate = {
      x: position.x,
      y: position.y,
      size,
    };

    const hasCollision = avoidEntities.some((entity) =>
      isColliding(candidate, entity)
    );

    if (!hasCollision) {
      return position;
    }
  }

  return generateRandomPosition(maxWidth, maxHeight);
}

function getDangerKeys(entities) {
  return Object.keys(entities).filter((key) => key.startsWith("danger"));
}

function getDangerCircles(entities) {
  return getDangerKeys(entities).map((key) => entities[key]);
}

function getClickPosition(mouseEvent) {
  const nativeEvent = mouseEvent.payload.nativeEvent;

  const gameArea =
    nativeEvent.currentTarget ||
    nativeEvent.target.closest(".game-area") ||
    document.querySelector(".game-area");

  if (!gameArea) {
    return null;
  }

  const rect = gameArea.getBoundingClientRect();

  return {
    x: nativeEvent.clientX - rect.left,
    y: nativeEvent.clientY - rect.top,
  };
}

function movePlayerByClick(entities, input) {
  const mouseDown = input.find((event) => event.name === "onMouseDown");

  if (!mouseDown) {
    return;
  }

  const clickPosition = getClickPosition(mouseDown);

  if (!clickPosition) {
    return;
  }

  entities.player.x = clickPosition.x;
  entities.player.y = clickPosition.y;
}

function respawnCoinAndDangers(entities) {
  const dangerKeys = getDangerKeys(entities);

  const newCoinPosition = generateSafePosition(
    entities.game.width,
    entities.game.height,
    entities.coin.size,
    [entities.player]
  );

  entities.coin.x = newCoinPosition.x;
  entities.coin.y = newCoinPosition.y;
  entities.coin.frameCounter = 0;

  const alreadySpawned = [entities.player, entities.coin];

  dangerKeys.forEach((dangerKey) => {
    const danger = entities[dangerKey];

    const newDangerPosition = generateSafePosition(
      entities.game.width,
      entities.game.height,
      danger.size,
      alreadySpawned
    );

    danger.x = newDangerPosition.x;
    danger.y = newDangerPosition.y;

    alreadySpawned.push(danger);
  });
}

function updateCoinAndDangerMovement(entities) {
  entities.coin.frameCounter += 1;

  if (entities.coin.frameCounter >= entities.coin.moveIntervalFrames) {
    respawnCoinAndDangers(entities);
  }
}

function checkDangerCollision(entities, dangerCircles) {
  const touchedDanger = dangerCircles.some((danger) =>
    isColliding(entities.player, danger)
  );

  if (touchedDanger) {
    entities.game.isGameOver = true;
    entities.status.visible = true;
    entities.status.message =
      "Você clicou em um círculo laranja. Recarregue a página para jogar novamente.";
  }
}

function checkCoinCollision(entities) {
  const touchedCoin = isColliding(entities.player, entities.coin);

  if (touchedCoin) {
    entities.score.value += 1;
    respawnCoinAndDangers(entities);
  }
}

export function MoveAndCollect(entities, { input }) {
  if (!entities.game.hasSpawnedInitialObjects) {
    respawnCoinAndDangers(entities);
    entities.game.hasSpawnedInitialObjects = true;
  }

  if (entities.game.isGameOver) {
    return entities;
  }

  movePlayerByClick(entities, input);

  const dangerCircles = getDangerCircles(entities);

  checkDangerCollision(entities, dangerCircles);

  if (entities.game.isGameOver) {
    return entities;
  }

  checkCoinCollision(entities);

  updateCoinAndDangerMovement(entities);

  return entities;
}