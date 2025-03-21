import React from 'react';
import './sortingViz.css';

const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingViz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      active: false,
      sorted: false
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 150; i++) {
      array.push(randomIntervalInt(5, 400)); // Keeping max height smaller for UI
    }
    this.setState({ array,
      sorted: false
     });
  }

  animateSorting(animations) {
    this.setState({active: true});
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        this.setState({ array: animations[i].array });
        const bar = document.querySelectorAll('.array-bar')[animations[i].index];
        if (bar) bar.style.backgroundColor = SECONDARY_COLOR;
        
        
      }, i * 10);
    }

    setTimeout(() => {
      document.querySelectorAll('.array-bar').forEach((bar) => {
        bar.style.backgroundColor = PRIMARY_COLOR;

        this.setState({active: false,
          sorted: true
        });
      });
    }, animations.length * 10);

    

    


  }

  bubbleSortAnimate() {
    if(this.state.sorted){ alert("It is already sorted please generate a new array"); return; }
    const animations = [];
    const array = this.state.array.slice();
    this.bubbleSort(array, animations);
    this.animateSorting(animations);
  }

  bubbleSort(arr, animations) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          animations.push({ array: [...arr], index: j });
        }
      }
    }
  }

  mergeSortAnimate() {
    if(this.state.sorted){ alert("It is already sorted please generate a new array"); return; }
    const animations = [];
    const array = this.state.array.slice();
    this.mergeSortHelper(array, 0, array.length - 1, animations);
    this.animateSorting(animations);
    
  }

  mergeSortHelper(arr, left, right, animations) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    this.mergeSortHelper(arr, left, mid, animations);
    this.mergeSortHelper(arr, mid + 1, right, animations);
    this.merge(arr, left, mid, right, animations);
  }

  merge(arr, left, mid, right, animations) {
    const temp = arr.slice();
    let i = left, j = mid + 1, k = left;
    
    while (i <= mid && j <= right) {
      if (temp[i] <= temp[j]) {
        arr[k++] = temp[i++];
      } else {
        arr[k++] = temp[j++];
      }
      animations.push({ array: [...arr], index: k - 1 });
    }

    while (i <= mid) {
      arr[k++] = temp[i++];
      animations.push({ array: [...arr], index: k - 1 });
    }
    
    while (j <= right) {
      arr[k++] = temp[j++];
      animations.push({ array: [...arr], index: k - 1 });
    }
  }

  quickSortAnimate() {
    if(this.state.sorted){ alert("It is already sorted please generate a new array"); return; }
    const animations = [];
    const array = this.state.array.slice();
    this.quickSort(array, animations, 0, array.length - 1);
    this.animateSorting(animations);

  }

  quickSort(arr, animations, low, high) {
    if (low < high) {
      let pi = this.partition(arr, low, high, animations);
      this.quickSort(arr, animations, low, pi - 1);
      this.quickSort(arr, animations, pi + 1, high);
    }
  }

  partition(arr, low, high, animations) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        animations.push({ array: [...arr], index: j });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    animations.push({ array: [...arr], index: high });
    return i + 1;
  }

  heapSortAnimate() {
    if(this.state.sorted){ alert("It is already sorted please generate a new array"); return; }
    const animations = [];
    const array = this.state.array.slice();
    this.heapSort(array, animations);
    this.animateSorting(animations);
  }

  heapSort(arr, animations) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(arr, n, i, animations);
    }
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      animations.push({ array: [...arr], index: 0 });
      this.heapify(arr, i, 0, animations);
    }
  }

  heapify(arr, n, i, animations) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      animations.push({ array: [...arr], index: i });
      this.heapify(arr, n, largest, animations);
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div>
        <div className='array-container'>
          {array.map((value, idx) => (
            <div className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}>
            </div>
          ))}
        </div>

        <div className='button-container'>
          <button className="gen-button" onClick={() => this.resetArray()}
            disabled={this.state.active}>
            Generate New Array
          </button>

          <button className="gen-button" onClick={() => this.bubbleSortAnimate()} 
            disabled={this.state.active}>
            Bubble Sort
          </button>

          <button className="gen-button" onClick={() => this.mergeSortAnimate()} 
            disabled={this.state.active}>
            Merge Sort
          </button>

          <button className="gen-button" onClick={() => this.quickSortAnimate()} 
            disabled={this.state.active}>
            Quick Sort
          </button>

          <button className="gen-button" onClick={() => this.heapSortAnimate()} 
            disabled={this.state.active}>
            Heap Sort
          </button>
        </div>
      </div>
    );
  }
}

function randomIntervalInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
