// @flow
import * as React from "react";

import { ErrorDisplay } from "./ErrorDisplay";

type ErrorType = {
  message: string,
  [string]: any,
};

type Props = {
  children: React.Element<any>,
};

type State = {
  error: ErrorType | null,
  info: ?{},
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error: ErrorType, info: {}) {
    this.setState({ error, info });
  }
  render() {
    const { children } = this.props;
    const { error, info } = this.state;

    return error !== null ? (
      <ErrorDisplay error={error} info={info} />
    ) : (
      children
    );
  }
}
