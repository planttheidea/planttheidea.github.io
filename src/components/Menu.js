// external dependencies
import React, {
  Component,
  PropTypes
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Link
} from 'react-router';

// actions
import {
  setActive,
  setDropdownActive
} from '../actions/menuActions';

// constants
import {
  home,
  libraries
} from '../constants/routes';
import {
  raf
} from '../constants/vendorPrefixedFunctions';

// styles
import styles from '../styles/scoped/components/Menu.scss';

const mapStateToProps = ({menu}) => {
  return menu;
};

const mapDispatchToProps = {
  setActive,
  setDropdownActive
};

@connect(mapStateToProps, mapDispatchToProps)
class Menu extends Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    isDropdownActive: PropTypes.bool,
    setActive: PropTypes.func,
    setDropdownActive: PropTypes.func
  };

  hideDropdown = () => {
    const {
      setDropdownActive
    } = this.props;

    setDropdownActive(false);

    window.removeEventListener('click', this.hideDropdown);
  };

  onClickMenuItem = (e) => {
    const {
      setActive
    } = this.props;

    const activeIndex = +e.currentTarget.getAttribute('data-index');

    setActive(activeIndex);
  };

  showDropdown = (e) => {
    const {
      setDropdownActive
    } = this.props;

    e.stopPropagation();
    e.preventDefault();

    setDropdownActive(true);

    raf(() => {
      window.addEventListener('click', this.hideDropdown);
    });
  };

  render() {
    const {
      activeIndex,
      isDropdownActive
    } = this.props;

    const isHome = activeIndex === 0;

    let activeLibrary = null;

    if (!isHome) {
      activeLibrary = libraries.find((library, libraryIndex) => {
        return libraryIndex + 1 === activeIndex;
      });
    }

    return (
      <header>
        <nav>
          <div className="nav has-shadow">
            <div className={`nav-left ${styles.linkContainer}`}>
              <Link
                className={`nav-item is-tab${isHome ? ' is-active' : ''}`}
                data-index={0}
                onClick={this.onClickMenuItem}
                to={home.href}
              >
                <i className={`fa fa-home ${styles.menuIcon}`}/>

                {home.title}
              </Link>

              <div className={styles.navItemWithDropdown}>
                <a
                  className={`nav-item is-tab${!isHome ? ' is-active' : ''}`}
                  onClick={this.showDropdown}
                >
                  <i className={`fa fa-code ${styles.menuIcon}`}/>

                  {isHome ? 'Libraries' : activeLibrary.title}
                </a>

                <div className={isDropdownActive ? styles.menuDropdownActive : styles.menuDropdown}>
                  {libraries.map(({description, href, title}, menuItemIndex) => {
                    return (
                      <Link
                        className="nav-item"
                        data-index={menuItemIndex + 1}
                        key={`menu-item-${menuItemIndex}`}
                        onClick={this.onClickMenuItem}
                        title={description}
                        to={href}
                      >
                        {title}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <a
                className="nav-item is-tab"
                href="https://github.com/planttheidea"
                rel="noopener"
                target="_blank"
              >
                <i className={`fa fa-github ${styles.menuIcon}`}/>

                Github
              </a>
            </div>

            <div className={`nav-right ${styles.logo}`}>
              <Link
                className="nav-item"
                data-index={0}
                onClick={this.onClickMenuItem}
                to={home.href}
              >
                plant the idea
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Menu;
