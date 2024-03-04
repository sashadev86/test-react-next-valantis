# Тестовое задание в компанию TVOЁ
## Позиция Frontend developer

### Задание
Используя предоставленный апи создать страницу, которая отображает список товаров.  
Для каждого товара должен отображаться его id, название, цена и бренд.

### Требования:
* выводить по 50 товаров на страницу с возможностью постраничного перехода (пагинация) в обе стороны.
* возможность фильтровать выдачу используя предоставленное апи по названию, цене и бренду
* Если API возвращает дубли по id, то следует их считать одним товаром и выводить только первый, даже если другие поля различаются.
* Если API возвращает ошибку, следует вывести идентификатор ошибки в консоль, если он есть и повторить запрос.

Задание можно выполнять на **React** или на **нативном JS**.  
Оцениваться будет правильность работы сайта и качество кода.  
**Внешний вид** сайта оставляем на Ваше усмотрение.

Пароль для доступа к апи: **Valantis**  
API доступно по адресам:  
* http://api.valantis.store:40000/
* https://api.valantis.store:41000/  


[Документация по работе с **API** прилагается](https://github.com/ValantisJewelry/TestTaskValantis/blob/main/API.md)

### Форма подачи:
Выполненное задание разместите на **github pages** или аналогичном сервисе.  
В сообщении на hh отправить ссылку на сайт и на исходник.  
Работы без ссылки на рабочий проект рассматриваться не будут.

## Стек выполненного задания:
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- Axios

### Демонстрация:
1. Клонируйте репазиторий:
```
 https://github.com/BANDITOS86/test-react-next-valantis/tree/dev
```

2. Для подтягивания необходимых библиотек и зависимостей, в консоли выполните команду:
```javascript
 npm instal
```
3. После установки всех необходимых зависимостей для dev сборки запустите команду:
```javascript
 npm dev
```
4. После установки всех необходимых зависимостей для build сбоки запустите команду:
```javascript
 npm build
```
5. После установки всех необходимых зависимостей и запуска команды npm build, для просмотра итогового билда запустите команду:
```javascript
 npm start
```

### Deploy задания:
#### [Deploy задания](https://test-tvoe-live.vercel.app/ "Deploy задания")

### Результат задания:
##### Отфильтрованая по цене и бренду:
[![My cv](https://github.com/BANDITOS86/my-img/blob/main/valantis-filtered-price-and-brand.png?raw=true)](https://test-tvoe-live.vercel.app/)
##### Главна: 
[![My cv](https://github.com/BANDITOS86/my-img/blob/main/valantis-home.png?raw=true)](https://test-tvoe-live.vercel.app/)