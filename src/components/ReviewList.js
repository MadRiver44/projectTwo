import React, { Component } from 'react'

class ReviewList extends Component {
  constructor (props) {
    super(props);
  }

  render() {
   // console.log(this.props.selectedTrail)
/*      let uniqueTrail = this.props.selectedTrail;
      let trailsArray = this.props.trailsArray

        let filteredReviewList = Object.keys(trailsArray).filter((trail, i) => {
          if(trail === uniqueTrail) {
            return trail;
          }
        });
        //console.log(filteredReviewList) // gets my specific trail id
        //console.log(this.props); //trailsArray is an OBJECT, not Array
        for (let id in trailsArray) {
          if (id === uniqueTrail) {
            let reviews = Object.keys(trailsArray[id].reviews).map((reviewItem ,i) => {
              return (
                <li key={reviewItem}> {reviewItem.review} {reviewItem.userName} </li>
                  )
                })

            }
          }
*/


    return (
      null

      )
  }
}

export default ReviewList;
//{/*<ul>{reviews}</ul> */}
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
