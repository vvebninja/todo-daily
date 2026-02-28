import antfu from "@antfu/eslint-config";

export default antfu(
  {
    react: true,
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: "single",
    },
  },
  {
    rules: {
      // 1. Порожні рядки між логічними блоками (PRO стандарт)
      "style/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" }, // Завжди порожній рядок перед return
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" }, // Після оголошення змінних
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] }, // Дозволяє змінні в купі
        { blankLine: "always", prev: "*", next: "if" }, // Завжди перед if
        { blankLine: "always", prev: "if", next: "*" }, // Завжди після if
        { blankLine: "always", prev: "*", next: "function" }, // Перед функціями
        { blankLine: "always", prev: "function", next: "*" }, // Після функцій
      ],

      // 2. Заборона "магічних" чисел (краще виносити в константи)
      "ts/no-magic-numbers": ["warn", { ignore: [0, 1], ignoreArrayIndexes: true }],

      // 3. Сортування імпортів (щоб не було хаосу на початку файлу)
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        },
      ],

      // 4. Обмеження складності функцій (якщо функція занадто велика — рефактор)
      complexity: ["warn", 10],
    },
  }
);
