// external depedencies
import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router';

// components
import ContainerCard from '../components/ContainerCard';

// constants
import {
  libraries
} from '../constants/routes';

// styles
import styles from '../styles/scoped/pages/Home.scss';

class Home extends Component {
  render() {
    return (
      <div>
        <ContainerCard>
          <h2 className="title">
            Welcome!
          </h2>

          This site documents the various libraries that I have written and published to npm. While documentation exists on <a
            href="https://github.com/planttheidea"
            rel="noopener"
            target="_blank"
          >
            github
          </a> for each individual project, I felt it valuable to have a central repository that could be accessed as well.
        </ContainerCard>

        <ContainerCard>
          <h4 className="title">
            Libraries
          </h4>

          {libraries.map(({description, href, title}, libraryIndex) => {
            return (
              <Link
                className={styles.library}
                key={`library-${libraryIndex}`}
                to={href}
              >
                <div className={styles.libraryName}>
                  {title}
                </div>

                <div className={styles.libraryDescription}>
                  {description}
                </div>
              </Link>
            );
          })}
        </ContainerCard>
      </div>
    );
  }
}

export default Home;
