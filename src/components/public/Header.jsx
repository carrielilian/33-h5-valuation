import React, { PureComponent } from 'react';
import { getPlatform } from '../../utils/tool';
import styles from './header.css';
/* eslint-disable no-nested-ternary */

const backImg = require('../../assets/images/back.png');

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      platform: false,
    };
  }

  componentWillMount() {
    // ios11
    const platform = getPlatform();
    this.setState({ platform });
  }

  clickBack = () => {
    const { clickFunc, noBackBtn } = this.props;
    if (!noBackBtn) {
      clickFunc();
    }
  }

  render() {
    const { platform } = this.state;
    const { noBackBtn } = this.props;

    return (
      <div className={styles.headerBox}>
        {/* 覆盖ios11顶部留白 开始 */}
        {
          window.MOCK_STOCKS_CURRENT_ENV !== 'LOCAL_ENV' ?
          (platform ? <div className={styles.ios11} /> : null)
          : null
        }
        {/* 覆盖ios11顶部留白 结束 */}

        {/* 头部 开始 */}
        <header className={styles.header}>
          <div
            className={styles.iconBtn}
            onClick={() => this.clickBack()}
          >
            {
              noBackBtn ? null : (
                <img
                  className={styles.iconBack}
                  src={backImg}
                  alt=""
                />
              )
            }
          </div>

          <div className={styles.title}>{this.props.title}</div>
          <div className={styles.iconBtn} />
        </header>
        {/* 头部 结束 */}
      </div>
    );
  }
}

export default Header;
