// Удаление пробелов при вводе
export const clearSpaceOnInput = (e: { target: any }) => {
  const input = e.target;
  input.value = input.value.replace(/\s+/g, ''); // Убираем все пробелы
};

// Блокировка ввода пробелов
export const blockedSpaceKeyDown = (e: {
  key: string;
  preventDefault: () => void;
}) => {
  if (e.key === ' ') {
    e.preventDefault(); // Запрещаем ввод пробела
  }
};
