const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const { Todo } = require('./database/models');

// app.set()でexpressインスタンスの全体の設定をしている
app.set('views', path.join(__dirname, 'views'));

// viewsフォルダのテンプレートファイルを使用する際に、拡張子を省略して記述できるようにしている。
// テンプレートエンジンにejsを指定
app.set('view_engine', 'ejs');

// 静的ファイルの読み込み
app.use(express.static(path.join(__dirname, 'public')));

// form送信などをPOSTで受け取る際に
// dataがbodyで送られてくるのでそれで必要な処理
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// todoを全件取得するrouting処理
app.get('/todo', (req, res, next) => {
    Todo.findAll().then((todoList) => {
        res.render('index.ejs', { 
        templateName: 'page/home.ejs',
        todoList,
      });
    })
});

// todoを一件取得
app.get('/todo/:id', (req, res, next) => {
    Todo.findByPk(req.params.id).then((todo) => {
        res.render('index.ejs', { 
            templateName: 'page/detail.ejs',
            todo,
        });
    });
});

// formから送られてきた内容はreq.bodyにある
// todoの新規作成
app.post('/todo', (req, res, next) => {
  console.log("===================================")
  console.log(res.send);
  console.log(req.body);
  const param = {
      title: req.body['todo-title'],
      content: req.body['todo-content'],
  };

  Todo.create(param).then(() => {
    // DBに追加成功したら`/todo`にリダイレクト
      res.redirect('/todo');
  }).catch(() => {
      res.send({ error: 'エラーが起きました'});
  });
});

// todoの更新処理
app.put('/todo/:id', (req, res, next) => {
    Todo.findByPk(req.params.id).then((todo) => {
        todo['title'] = req.body['todo-title']
        todo['content'] = req.body['todo-content']
        console.log(todo['title']);
        console.log(todo['content']);
        todo.save();
        res.redirect('/todo');
    });
});

app.delete('/todo/:id', (req, res, next) => {
    // let todo = Todo.findByPk(req.params.id);
    Todo.findByPk(req.params.id).then((todo) => {
        todo.destroy();
        res.redirect('/todo');
    });
    // Todo.findAll().then((todoList) => {
    //     const todoIndex = req.params.id;
    //     todoList.splice(todoIndex, 1);
    //     res.redirect('/todo');
    // });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});