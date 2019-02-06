import React from 'react';
import T from 'prop-types';
import Head from 'next/head';

const pageWithStyles = (WrappedComponent) => {
  class PWS extends React.Component {
    static displayName;

    static defaultProps = {
      css: [],
    };

    static childContextTypes = {
      insertCss: T.func,
      css: T.array
    };

    static getInitialProps(param) {
      if (typeof WrappedComponent.getInitialProps === 'function') {
        return WrappedComponent.getInitialProps.call(WrappedComponent, param);
      }

      return {};
    }

    getChildContext() {
      const { css } = this.props;

      let insertCss;

      if (typeof window === 'undefined') {
        insertCss = (...styles) => {
          styles.forEach((style) => {
            const cssText = style._getCss();
            if (!~css.indexOf(cssText)) {
              css.push(cssText);
            }
          });
        };
      } else {
        insertCss = (...styles) => {
          const removeCss = styles.map((x) => x._insertCss());

          return () => {
            removeCss.forEach((f) => f());
          };
        };
      }

      return { insertCss, css };
    }

    render() {
      const { css } = this.props;

      console.log(css.length);

      return (
        <div>
          <Head>
            <style
              className="_isl-styles"
              dangerouslySetInnerHTML={{ __html: css.join('') }}
            />
          </Head>
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  PWS.displayName = `PageWithStyles(${displayName})`;

  return PWS;
};

export { pageWithStyles as pws };
export default pageWithStyles;
