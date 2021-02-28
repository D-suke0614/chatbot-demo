import React from 'react';
import defaultDataset from './dataset';
import './assets/styles/style.css';
import { AnswersList, Chats } from './components/index';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: 'init',
      dataset: defaultDataset,
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)
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
        this.displayNextQuestion(nextQuestionID)
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

        this.displayNextQuestion(nextQuestionID)
        break;
    }
  }

  // // eslint-disable-next-line no-undef
  // initAnswer = () => {
  //   const initDataset = this.state.dataset[this.state.currentId];
  //   const initAnswers = initDataset.answers;

  //   this.setState({
  //     answers: initAnswers
  //   })
  // }

  componentDidMount() {
    const initAnswer = "";
    this.selectAnswer(initAnswer, this.state.currentId)
  }

  render() {
    return (
      <div>
        <section className="c-section">
          <div className="c-box">
            <Chats chats={this.state.chats} />
            <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          </div>
        </section>
      </div>
    );
  }
}
