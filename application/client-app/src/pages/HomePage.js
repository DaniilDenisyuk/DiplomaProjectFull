const HomePage = () => {
  return (
    <Home
      dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
      dishesLoading={this.props.dishes.isLoading}
      dishesErrMess={this.props.dishes.errMess}
      promotion={
        this.props.promotions.promotions.filter(
          (promotion) => promotion.featured
        )[0]
      }
      promosLoading={this.props.promotions.isLoading}
      promosErrMess={this.props.promotions.errMess}
      leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
      leadersLoading={this.props.leaders.isLoading}
      leadersErrMess={this.props.leaders.errMess}
    />
  );
};
