# The Game Of Live

## About:
Игра «**Жизнь**» (англ. Conway's Game of Life) — клеточный автомат, придуманный английским математиком Джоном Конвеем в 1970 году. Подробнее: [wikipedia.org](https://ru.wikipedia.org/wiki/%D0%98%D0%B3%D1%80%D0%B0_%C2%AB%D0%96%D0%B8%D0%B7%D0%BD%D1%8C%C2%BB)

## Rules
Само действие игры происходит на поле произвольного размера. Перед началом игры задаётся разбиение игрового поля на "живые" и "мертвые" участки. После старта в поле начинается проверка клетками друг друга: если вокруг клетки найдено 2 или 3 соседа, то она становится/остаётся живой, иначе умирает. Цикл повторяется до конца игры.

## Features
- Обновление поля - раз в 1 секнду, параметр можно настроить
- Настраиваемый размер игрового поля
- Выбор способа генерации 1-го поколения - случайный и с помощью ввода пользователя
