import React, { Component } from 'react'

class ReviewList extends Component {
  constructor (props) {
    super(props);
  }

  render() {
      let reviewList = [];
      let reviewObject = this.props.trails[this.props.selectedTrail].reviews;
      console.log(this.props);

    return (
      null
      )
  }
}

export default ReviewList;

/*
        <div className="review-list">
          {reviewList}
        </div>

*/
//  let reviewList = [];
  //let reviewObject = this.state.trails[this.state.selectedTrail].reviews;
 // console.log(reviewObject);
   /*for (let reviewItemId in reviewObject) {
    let item = reviewObject[reviewItemId]
    console.log(item)
    reviewList.push(
      <div key={reviewItemId}>
        <div onClick={() => {this.selectedReviewItem(reviewItemId)} }>
          <h3>{reviewItemId.review}</h3>
          <h5>{reviewItemId.userName}</h5>
        </div>
        <button onClick={()=>{this.deleteAnItem(reviewItemId)} } />
      </div>

          );
    }
*/
