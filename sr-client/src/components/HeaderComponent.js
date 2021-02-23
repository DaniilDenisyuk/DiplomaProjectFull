import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };

    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    this.toggleModal();
    alert(
      "Username: " +
        this.username.value +
        " Password: " +
        this.password.value +
        " Remember: " +
        this.remember.checked
    );
    event.preventDefault();
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <header class="header">
        <div class="__container__">
          <div class="header__wrapper">
            <nav class="header__nav nav-menu" id="nav-menu">
              <div class="nav-menu__wrapper">
                <div class="nav-menu__close i-close"></div>
                <div class="nav-menu__logo logo">
                  <div class="logo__img">
                    <img src="./img/fs-logo.svg" alt="Logo" />
                  </div>
                  <div class="logo__text">
                    <img
                      src="./img/fs-logo-text-line.png"
                      alt="Festival sushi"
                    />
                  </div>
                </div>
                <nav class="nav-menu__items-wrapper">
                  <a href="/home" class="nav-menu__item">
                    Головна
                  </a>
                  <a href="/menu" class="nav-menu__item">
                    Меню
                  </a>
                  <a href="/discounts" class="nav-menu__item">
                    Акції
                  </a>
                  <a href="/delivery" class="nav-menu__item">
                    Доставка
                  </a>
                </nav>
                <div class="nav-menu__about">
                  <a href="#" class="nav-menu__item">
                    Про нас
                  </a>
                  <span>/</span>
                  <a href="#" class="nav-menu__item">
                    Контакти
                  </a>
                </div>
              </div>
            </nav>
            <a class="header__contact" href="tel:+3809812345678">
              <p>+38(098)12345678</p>
            </a>
            <div class="header__basket basket" id="basket-btn">
              <div class="basket__basket">
                <span class="basket__item-cnt">6</span>
              </div>
              <p class="basket__sum">820 грн.</p>
            </div>
            <div class="header__burger" id="burger-menu">
              <span></span>
            </div>
            <div class="header__location location">
              <div class="location__icon"></div>
              <div class="location__selected">
                <p class="location__name">Фастів</p>
                <div class="location__arrow selmenu-arrow"></div>
              </div>

              <div class="location__wrapper"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span>
                    About us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span>
                    Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span>
                    Contact us
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-sign-in fa-lg" />
                    Login
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
