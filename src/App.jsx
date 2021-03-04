import React from 'react';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index';
import FormDialog from './components/Forms/FormDialog';
import { db } from './Firebase/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: {},
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  // eslint-disable-next-line no-undef
  displayNextQuestion = (nextQuestionID) => {
    const chats = this.state.chats
    chats.push({
      text: this.state.dataset[nextQuestionID].question,
      type: 'question'
    })
    this.setState({
      answers: this.state.dataset[nextQuestionID].answers,
      chats: chats,
      currentId: nextQuestionID
    })
  }

  // eslint-disable-next-line no-undef
  selectAnswer = (selectedAnswer, nextQuestionID) => {
    switch (true) {
      case (nextQuestionID === 'init'):
        setTimeout(() => this.displayNextQuestion(nextQuestionID), 300)
        break;

      case (nextQuestionID === 'contact'):
        this.handleClickOpen();
        break;

      case (/^https:*/.test(nextQuestionID)):
        const a = document.createElement('a');
        a.href = nextQuestionID;
        a.target = '_blank';
        a.click();
        break;

      default:
        const chats = this.state.chats;
        chats.push({
          text: selectedAnswer,
          type: 'answer'
        });

        this.setState({
          chats: chats
        })

        setTimeout(() => this.displayNextQuestion(nextQuestionID), 500)
        break;
    }
  }

  // eslint-disable-next-line no-undef
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // eslint-disable-next-line no-undef
  handleClose = () => {
    this.setState({ open: false });
  };

  // // eslint-disable-next-line no-undef
  // initAnswer = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   const initAnswers = initDataset.answers;

  //   this.setState({
  //     answers: initAnswers
  //   })
  // }

  // eslint-disable-next-line no-undef
  initDataset = (dataset) => {
    this.setState({dataset: dataset})
  }

  componentDidMount() {
    (async() => {
      const dataset = this.state.dataset

      await db.collection('questions').get().then(snapshots => {
        snapshots.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          dataset[id] = data
        })
      })

      this.initDataset(dataset)
      const initAnswer = "";
      this.selectAnswer(initAnswer, this.state.currentId)
    }) ()
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }

  render() {
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats} />
            <AnswersList answers={this.state.answers} select={this.selectAnswer} />
            <FormDialog open={this.state.open} handleClose={this.handleClose} />
          </div>
        </section>
      </div>
    );
  }
}
