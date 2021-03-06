import * as React from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";

import { generateRandomInt } from "../../../helpers/math";
import { setLines, setPages } from "../../../reducers/prediction";
import { Button } from "../../blocks/Button";
import { NumberInput } from "../../blocks/NumberInput";

import styles from "./PredictionBook.less";

namespace PredictionBookNS {
  export interface OwnProps {}

  export interface StateProps {
    pages: number;
    lines: number;
  }

  export interface DispatchProps {
    selectPages: (amount: number) => AnyAction;
    selectLines: (amount: number) => AnyAction;
  }

  export type Props = OwnProps & StateProps & DispatchProps;

  export interface State {
    answer: string;
  }
}

class PredictionBookComponent extends React.PureComponent<
  PredictionBookNS.Props,
  PredictionBookNS.State
> {
  public state: PredictionBookNS.State;

  constructor(props: PredictionBookNS.Props) {
    super(props);

    this.state = {
      answer: ""
    };
  }

  public render() {
    const { pages, lines, selectPages, selectLines } = this.props;
    const { answer } = this.state;

    return (
      <>
        <h1>{`Prediction Book`}</h1>
        <p>{`Choose some book and enter next information.`}</p>
        <p>
          <label>{`Number of pages in a book: `}</label>
          <NumberInput value={pages} onChange={selectPages} />
        </p>
        <p>
          <label>{`Number of lines on a page: `}</label>
          <NumberInput value={lines} onChange={selectLines} />
        </p>
        <p className={styles.answer}>
          {answer ? answer : "Reveal the answer!"}
        </p>
        <p>
          <Button onClick={this.generateRandomLine} primary>
            Make Magic!
          </Button>
        </p>
      </>
    );
  }

  /**
   * Compose prediction place
   */
  private generateRandomLine = (): void => {
    const { pages, lines } = this.props;
    let answer = "";

    if (pages < 1 || lines < 1) {
      answer = `Enter above positive number of pages and lines less than ${Number.MAX_VALUE}.`;
    } else {
      answer = `
                Prediction for you is placed on
                page ${generateRandomInt(1, pages)},  on
                line ${generateRandomInt(1, lines)}
                from ${generateRandomInt(1, 2) === 2 ? "top" : "bottom"}.
            `;
    }

    this.setState({ answer: answer });
  };
}

export const PredictionBook = connect<
  PredictionBookNS.StateProps,
  PredictionBookNS.DispatchProps,
  PredictionBookNS.OwnProps
>(
  (state: any) => ({ ...state.prediction }),
  {
    selectPages: setPages,
    selectLines: setLines
  }
)(PredictionBookComponent);
