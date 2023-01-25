import { Container, Row, Col } from 'react-bootstrap'
import { Nav, NavItem} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faUser, faCalendarDays, faBookmark } from '@fortawesome/free-solid-svg-icons';

const tabs = [
    {
        route: "/workouts",
        icon: faBookmark
    },
    {
        route: "/muscles",
        icon: faDumbbell
    },
    {
        route: "/history",
        icon: faCalendarDays
    },
    {
        route: "/profile",
        icon: faUser
    }
]

const Navigation = () => {
	return (
        <Container className='navigation-tabs d-flex flex-column justify-content-center'>
            <Row>
                <Col sm={12} className="m-auto">
                    <nav className="navbar" role="navigation">
                        <Nav className="w-100">
                            <div className="d-flex flex-row justify-content-around w-100">
                                {tabs.map((tab, index) =>(
                                    <NavItem key={`tab-${index}`}>
                                        <NavLink to={tab.route} className="nav-link" activeclassname="active">
                                            <div>
                                                <FontAwesomeIcon size="xl" icon={tab.icon}/>
                                            </div>
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </div>
                        </Nav>
                    </nav>
                </Col>
            </Row>
        </Container>    
    )
};

export default Navigation;