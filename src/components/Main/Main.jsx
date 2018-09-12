import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Header from '../public/Header';
import styles from '../Main/main.css';
import { actionType as mainSaga } from '../../models/sagas/main.saga';

/* eslint-disable no-nested-ternary, no-param-reassign, react/no-did-mount-set-state */

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickType: 'pe',
      isUp: false,
      Height: 0,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch({ type: mainSaga.getData });
  }

  componentDidMount() {
    setTimeout(() => {
      const topDivHeight = this.topDiv.clientHeight;
      const footerDivHeight = this.footerDiv.clientHeight;
      this.setState({
        Height: window.innerHeight - topDivHeight - footerDivHeight,
      });
    }, 10);
  }

  sortFunc = (type) => {
    const { isUp, clickType } = this.state;
    const typeState = (clickType === type) ? (!isUp) : false;

    this.setState({
      clickType: type,
      isUp: typeState,
    });
  }

  compare = property => (a, b) => {
    const value1 = a[property];
    const value2 = b[property];
    return value1 - value2;
  }

  sort = (arr) => {
    const { clickType, isUp } = this.state;
    let temp;
    if (arr.length <= 1) {
      temp = arr;
    } else {
      const newArr = arr.sort(this.compare(clickType));
      temp = isUp ? newArr.reverse() : newArr;
    }

    return temp;
  }

  getClassName = (type) => {
    const { clickType, isUp } = this.state;
    let classtype = styles.spanItem;
    if (clickType === type) {
      classtype = isUp ? styles.spanItemTrue : styles.spanItemFalse;
    }

    return classtype;
  }

  assortment = (pe, pePercent) => {
    let a = '适中';

    if (pe < 16 && pePercent < 0.3) {
      a = '低估';
    } else if (pe > 20 && pePercent > 0.65) {
      a = '高估';
    }
    // } else {
    //   a = '适中';
    // }

    return a;
  }

  render() {
    const { Height } = this.state;
    const { main } = this.props;
    const sortData = this.sort(main);

    return (
      <div className={styles.main}>
        <div
          ref={(div) => { this.topDiv = div; }}
        >
          <Header
            title="指数估值排行"
          />
        </div>
        <div
          style={{ height: Height }}
          className={styles.mainBox}
        >
          <div className={styles.fliterBox}>
            <div className={styles.leftBox}>
              <nav className={styles.leftNav}>
                指数名称
              </nav>
              {
                sortData.map((item, index) => (
                  <div key={index}>
                    <div
                      className={styles.itemLeft}
                      data-type={this.assortment(item.pe, item.pePercent)}
                    >
                      <div className={styles.itemLeftName}>{item.name}</div>
                      <div className={styles.itemLeftNum}>{item.code}</div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className={styles.rightBox}>
              <nav className={styles.rightBoxNav}>
                <div
                  className={styles.rightNav}
                >
                  <span
                    onClick={() => this.sortFunc('pe')}
                    className={this.getClassName('pe')}
                  >
                    PE
                  </span>
                </div>
                <div className={styles.rightNav}>
                  <span
                    onClick={() => this.sortFunc('pePercent')}
                    className={this.getClassName('pePercent')}
                  >
                    PE百分位
                  </span>
                </div>
                <div className={styles.rightNav}>
                  <span
                    onClick={() => this.sortFunc('pb')}
                    className={this.getClassName('pb')}
                  >
                    PB
                  </span>
                </div>
                <div className={styles.rightNav}>
                  <span
                    onClick={() => this.sortFunc('pbPercent')}
                    className={this.getClassName('pbPercent')}
                  >
                    PB百分位
                  </span>
                </div>
                <div className={styles.rightNav}>
                  <span
                    onClick={() => this.sortFunc('yeild')}
                    className={this.getClassName('yeild')}
                  >
                    股息率
                  </span>
                </div>
                <div className={styles.rightNav}>
                  <span
                    onClick={() => this.sortFunc('roe')}
                    className={this.getClassName('roe')}
                  >
                    ROE
                  </span>
                </div>
                <div className={styles.rightNavTime}>
                  <span className={styles.spanItemTime}>起始时间</span>
                </div>
              </nav>
              {
                sortData.map((item, index) => (
                  <div className={styles.itemRight} key={index}>
                    <div className={styles.itemRightMain}>{item.pe}</div>
                    <div className={styles.itemRightMain}>{item.pePercent}</div>
                    <div className={styles.itemRightMain}>{item.pb}</div>
                    <div className={styles.itemRightMain}>{item.pbPercent}</div>
                    <div className={styles.itemRightMain}>{item.yeild}</div>
                    <div className={styles.itemRightMain}>{item.roe}</div>
                    <div className={styles.itemRightMainTime}>{item.startDate}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <footer
          ref={(footer) => { this.footerDiv = footer; }}
          className={styles.footer}
        >
          <div className={styles.maxWidth}>
            <div className={styles.footerItem} data-type="估值较低">估值较低</div>
            <div className={styles.footerItem} data-type="估值适中">估值适中</div>
            <div className={styles.footerItem} data-type="估值较高">估值较高</div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  main: state.main.main,
});

export default connect(mapStateToProps)(Main);
