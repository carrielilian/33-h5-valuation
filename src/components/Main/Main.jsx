import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Header from '../public/Header';
import styles from '../Main/main.css';

/* eslint-disable no-nested-ternary */
class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clickType: '',
      isUp: false,
    };
  }

  sortFunc = (type) => {
    const { isUp } = this.state;

    this.setState({
      clickType: type,
      isUp: !isUp,
    });
  }

  getClassName = (type) => {
    const { clickType, isUp } = this.state;
    let classtype = styles.spanItem;
    if (clickType === type) {
      classtype = isUp ? styles.spanItemTrue : styles.spanItemFalse;
    }

    return classtype;
  }

  render() {
    return (
      <div className={styles.main}>
        <Header
          title="指数估值排行"
        />
        <div className={styles.mainBox}>
          <div className={styles.leftBox}>
            <nav className={styles.leftNav}>
              指数名称
            </nav>
            <div className={styles.itemLeft} data-type="泸深300">
              <div className={styles.itemLeftName}>泸深300</div>
              <div className={styles.itemLeftNum}>SH000300</div>
            </div>
          </div>

          <div className={styles.rightBox}>
            <nav className={styles.rightBoxNav}>
              <div
                className={styles.rightNav}
                // onClick={() => this.sortFunc('pePercentile')}
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
                  onClick={() => this.sortFunc('pePercentile')}
                  className={this.getClassName('pePercentile')}
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
                  onClick={() => this.sortFunc('pbPercentile')}
                  className={this.getClassName('pbPercentile')}
                >
                  PB百分位
                </span>
              </div>
              <div className={styles.rightNav}>
                <span
                  onClick={() => this.sortFunc('dividend')}
                  className={this.getClassName('dividend')}
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
              <div className={styles.rightNav}>
                <span className={styles.spanItemTime}>起始时间</span>
              </div>
            </nav>


            <div className={styles.itemRight}>
              <div className={styles.itemRightMain}>8.86</div>
              <div className={styles.itemRightMain}>33.22%</div>
              <div className={styles.itemRightMain}>3.43</div>
              <div className={styles.itemRightMain}>24.23%</div>
              <div className={styles.itemRightMain}>3.34%</div>
              <div className={styles.itemRightMain}>5.34%</div>
              <div className={styles.itemRightMain}>2018.08.09</div>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerItem} data-type="估值较低">估值较低</div>
          <div className={styles.footerItem} data-type="估值适中">估值适中</div>
          <div className={styles.footerItem} data-type="估值较高">估值较高</div>
        </footer>
      </div>
    );
  }
}

export default connect()(Main);
