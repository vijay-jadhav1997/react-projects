const ShimmerCard = () => {
  return (
    <div className="shimmerCardBox">
          
      <div className="ShimmerBannerBox">
        <div className="img"></div>
        <span></span>
      </div>

      <div className="ShimmerCardDetails">
        <h3></h3>
        <h5></h5>
        <h5></h5>
        <h5></h5>
        <h4></h4>
        <h4></h4>
      </div>
  
    </div>
  );
}


const Shimmer = () => {
  return (
    <div className="shimmerCardsContainer ">
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
    </div>
  )
}

export default Shimmer;