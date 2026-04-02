export const ALGO_INFO = {
  bubble: {
    name: 'Bubble Sort',
    best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    desc: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if out of order. Larger elements bubble to the end each pass. An early-exit flag gives O(n) best-case when the array is already sorted.',
  },
  selection: {
    name: 'Selection Sort',
    best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    desc: 'Selection Sort repeatedly finds the minimum element from the unsorted portion and places it at the beginning. Makes at most n–1 swaps, making it ideal when write operations are costly.',
  },
  insertion: {
    name: 'Insertion Sort',
    best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    desc: 'Insertion Sort builds the sorted array one element at a time by inserting each new element into its correct position among already-sorted elements. Efficient for small or nearly-sorted data.',
  },
  merge: {
    name: 'Merge Sort',
    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',
    desc: 'Merge Sort uses divide-and-conquer: splits the array, recursively sorts each half, then merges them. Guarantees O(n log n) in all cases and is stable, but needs O(n) extra space.',
  },
  quick: {
    name: 'Quick Sort',
    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)',
    desc: 'Quick Sort picks a pivot, partitions elements around it, and recursively sorts partitions. One of the fastest practical algorithms on average despite the O(n²) worst case with bad pivots.',
  },
  counting: {
    name: 'Counting Sort',
    best: 'O(n+k)', avg: 'O(n+k)', worst: 'O(n+k)', space: 'O(k)',
    desc: 'Counting Sort counts occurrences of each integer value (range k), then reconstructs the sorted array. Not a comparison sort — extremely fast when k is close to n.',
  },
};

// ============================================================
// Code snippets — 6 algorithms × 4 languages (HTML for syntax)
// ============================================================
export const CODE_SNIPPETS = {
  bubble: {
    c: `<span class="kw">void</span> <span class="fn">bubbleSort</span>(<span class="kw">int</span> arr[], <span class="kw">int</span> n) {
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; n - <span class="num">1</span>; i++) {
    <span class="kw">int</span> swapped = <span class="num">0</span>;
    <span class="kw">for</span> (<span class="kw">int</span> j = <span class="num">0</span>; j &lt; n - i - <span class="num">1</span>; j++) {
      <span class="cm">// Compare adjacent elements</span>
      <span class="kw">if</span> (arr[j] &gt; arr[j + <span class="num">1</span>]) {
        <span class="kw">int</span> tmp = arr[j];
        arr[j] = arr[j + <span class="num">1</span>];
        arr[j + <span class="num">1</span>] = tmp;
        swapped = <span class="num">1</span>;
      }
    }
    <span class="kw">if</span> (!swapped) <span class="kw">break</span>;
  }
}`,
    cpp: `<span class="kw">void</span> <span class="fn">bubbleSort</span>(<span class="tp">vector</span>&lt;<span class="kw">int</span>&gt;&amp; arr) {
  <span class="kw">int</span> n = arr.<span class="fn">size</span>();
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; n - <span class="num">1</span>; i++) {
    <span class="kw">bool</span> swapped = <span class="kw">false</span>;
    <span class="kw">for</span> (<span class="kw">int</span> j = <span class="num">0</span>; j &lt; n - i - <span class="num">1</span>; j++) {
      <span class="kw">if</span> (arr[j] &gt; arr[j + <span class="num">1</span>]) {
        <span class="fn">swap</span>(arr[j], arr[j + <span class="num">1</span>]);
        swapped = <span class="kw">true</span>;
      }
    }
    <span class="kw">if</span> (!swapped) <span class="kw">break</span>;
  }
}`,
    java: `<span class="kw">public void</span> <span class="fn">bubbleSort</span>(<span class="kw">int</span>[] arr) {
  <span class="kw">int</span> n = arr.length;
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; n - <span class="num">1</span>; i++) {
    <span class="kw">boolean</span> swapped = <span class="kw">false</span>;
    <span class="kw">for</span> (<span class="kw">int</span> j = <span class="num">0</span>; j &lt; n - i - <span class="num">1</span>; j++) {
      <span class="kw">if</span> (arr[j] &gt; arr[j + <span class="num">1</span>]) {
        <span class="kw">int</span> tmp = arr[j];
        arr[j] = arr[j + <span class="num">1</span>];
        arr[j + <span class="num">1</span>] = tmp;
        swapped = <span class="kw">true</span>;
      }
    }
    <span class="kw">if</span> (!swapped) <span class="kw">break</span>;
  }
}`,
    python: `<span class="kw">def</span> <span class="fn">bubble_sort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n - <span class="num">1</span>):
        swapped = <span class="kw">False</span>
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(n - i - <span class="num">1</span>):
            <span class="kw">if</span> arr[j] &gt; arr[j + <span class="num">1</span>]:
                arr[j], arr[j + <span class="num">1</span>] = arr[j + <span class="num">1</span>], arr[j]
                swapped = <span class="kw">True</span>
        <span class="kw">if not</span> swapped:
            <span class="kw">break</span>
    <span class="kw">return</span> arr`,
  },
  selection: {
    c: `<span class="kw">void</span> <span class="fn">selectionSort</span>(<span class="kw">int</span> arr[], <span class="kw">int</span> n) {
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; n - <span class="num">1</span>; i++) {
    <span class="kw">int</span> minIdx = i;
    <span class="kw">for</span> (<span class="kw">int</span> j = i + <span class="num">1</span>; j &lt; n; j++)
      <span class="kw">if</span> (arr[j] &lt; arr[minIdx]) minIdx = j;
    <span class="kw">int</span> tmp    = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i]      = tmp;
  }
}`,
    cpp: `<span class="kw">void</span> <span class="fn">selectionSort</span>(<span class="tp">vector</span>&lt;<span class="kw">int</span>&gt;&amp; arr) {
  <span class="kw">int</span> n = arr.<span class="fn">size</span>();
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; n - <span class="num">1</span>; i++) {
    <span class="kw">int</span> minIdx = i;
    <span class="kw">for</span> (<span class="kw">int</span> j = i + <span class="num">1</span>; j &lt; n; j++)
      <span class="kw">if</span> (arr[j] &lt; arr[minIdx]) minIdx = j;
    <span class="fn">swap</span>(arr[i], arr[minIdx]);
  }
}`,
    java: `<span class="kw">public void</span> <span class="fn">selectionSort</span>(<span class="kw">int</span>[] arr) {
  <span class="kw">int</span> n = arr.length;
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">0</span>; i &lt; n - <span class="num">1</span>; i++) {
    <span class="kw">int</span> minIdx = i;
    <span class="kw">for</span> (<span class="kw">int</span> j = i + <span class="num">1</span>; j &lt; n; j++)
      <span class="kw">if</span> (arr[j] &lt; arr[minIdx]) minIdx = j;
    <span class="kw">int</span> tmp    = arr[minIdx];
    arr[minIdx] = arr[i];
    arr[i]      = tmp;
  }
}`,
    python: `<span class="kw">def</span> <span class="fn">selection_sort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n - <span class="num">1</span>):
        min_idx = i
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i + <span class="num">1</span>, n):
            <span class="kw">if</span> arr[j] &lt; arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    <span class="kw">return</span> arr`,
  },
  insertion: {
    c: `<span class="kw">void</span> <span class="fn">insertionSort</span>(<span class="kw">int</span> arr[], <span class="kw">int</span> n) {
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt; n; i++) {
    <span class="kw">int</span> key = arr[i], j = i - <span class="num">1</span>;
    <span class="kw">while</span> (j &gt;= <span class="num">0</span> &amp;&amp; arr[j] &gt; key) {
      arr[j + <span class="num">1</span>] = arr[j];
      j--;
    }
    arr[j + <span class="num">1</span>] = key;
  }
}`,
    cpp: `<span class="kw">void</span> <span class="fn">insertionSort</span>(<span class="tp">vector</span>&lt;<span class="kw">int</span>&gt;&amp; arr) {
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt; (<span class="kw">int</span>)arr.<span class="fn">size</span>(); i++) {
    <span class="kw">int</span> key = arr[i], j = i - <span class="num">1</span>;
    <span class="kw">while</span> (j &gt;= <span class="num">0</span> &amp;&amp; arr[j] &gt; key) {
      arr[j + <span class="num">1</span>] = arr[j]; j--;
    }
    arr[j + <span class="num">1</span>] = key;
  }
}`,
    java: `<span class="kw">public void</span> <span class="fn">insertionSort</span>(<span class="kw">int</span>[] arr) {
  <span class="kw">int</span> n = arr.length;
  <span class="kw">for</span> (<span class="kw">int</span> i = <span class="num">1</span>; i &lt; n; i++) {
    <span class="kw">int</span> key = arr[i], j = i - <span class="num">1</span>;
    <span class="kw">while</span> (j &gt;= <span class="num">0</span> &amp;&amp; arr[j] &gt; key) {
      arr[j + <span class="num">1</span>] = arr[j]; j--;
    }
    arr[j + <span class="num">1</span>] = key;
  }
}`,
    python: `<span class="kw">def</span> <span class="fn">insertion_sort</span>(arr):
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="fn">len</span>(arr)):
        key, j = arr[i], i - <span class="num">1</span>
        <span class="kw">while</span> j &gt;= <span class="num">0</span> <span class="kw">and</span> arr[j] &gt; key:
            arr[j + <span class="num">1</span>] = arr[j]; j -= <span class="num">1</span>
        arr[j + <span class="num">1</span>] = key
    <span class="kw">return</span> arr`,
  },
  merge: {
    c: `<span class="kw">void</span> <span class="fn">mergeSort</span>(<span class="kw">int</span> arr[], <span class="kw">int</span> l, <span class="kw">int</span> r) {
  <span class="kw">if</span> (l &lt; r) {
    <span class="kw">int</span> m = l + (r - l) / <span class="num">2</span>;
    <span class="fn">mergeSort</span>(arr, l, m);
    <span class="fn">mergeSort</span>(arr, m + <span class="num">1</span>, r);
    <span class="fn">merge</span>(arr, l, m, r);
  }
}

<span class="kw">void</span> <span class="fn">merge</span>(<span class="kw">int</span> arr[], <span class="kw">int</span> l, <span class="kw">int</span> m, <span class="kw">int</span> r) {
  <span class="kw">int</span> n1=m-l+<span class="num">1</span>, n2=r-m;
  <span class="kw">int</span> L[n1], R[n2];
  <span class="kw">for</span>(<span class="kw">int</span> i=<span class="num">0</span>;i&lt;n1;i++) L[i]=arr[l+i];
  <span class="kw">for</span>(<span class="kw">int</span> j=<span class="num">0</span>;j&lt;n2;j++) R[j]=arr[m+<span class="num">1</span>+j];
  <span class="kw">int</span> i=<span class="num">0</span>,j=<span class="num">0</span>,k=l;
  <span class="kw">while</span>(i&lt;n1&amp;&amp;j&lt;n2)
    arr[k++]=L[i]&lt;=R[j]?L[i++]:R[j++];
  <span class="kw">while</span>(i&lt;n1) arr[k++]=L[i++];
  <span class="kw">while</span>(j&lt;n2) arr[k++]=R[j++];
}`,
    cpp: `<span class="kw">void</span> <span class="fn">mergeSort</span>(<span class="tp">vector</span>&lt;<span class="kw">int</span>&gt;&amp; a, <span class="kw">int</span> l, <span class="kw">int</span> r) {
  <span class="kw">if</span> (l &gt;= r) <span class="kw">return</span>;
  <span class="kw">int</span> m = l + (r - l) / <span class="num">2</span>;
  <span class="fn">mergeSort</span>(a, l, m);
  <span class="fn">mergeSort</span>(a, m+<span class="num">1</span>, r);
  <span class="tp">vector</span>&lt;<span class="kw">int</span>&gt; tmp(a.begin()+l, a.begin()+r+<span class="num">1</span>);
  <span class="kw">int</span> i=<span class="num">0</span>,j=m-l+<span class="num">1</span>,k=l;
  <span class="kw">while</span>(i&lt;=m-l&amp;&amp;j&lt;=r-l)
    a[k++]=tmp[i]&lt;=tmp[j]?tmp[i++]:tmp[j++];
  <span class="kw">while</span>(i&lt;=m-l) a[k++]=tmp[i++];
  <span class="kw">while</span>(j&lt;=r-l) a[k++]=tmp[j++];
}`,
    java: `<span class="kw">public void</span> <span class="fn">mergeSort</span>(<span class="kw">int</span>[] arr, <span class="kw">int</span> l, <span class="kw">int</span> r) {
  <span class="kw">if</span> (l &gt;= r) <span class="kw">return</span>;
  <span class="kw">int</span> m = l + (r - l) / <span class="num">2</span>;
  <span class="fn">mergeSort</span>(arr, l, m);
  <span class="fn">mergeSort</span>(arr, m+<span class="num">1</span>, r);
  <span class="fn">merge</span>(arr, l, m, r);
}`,
    python: `<span class="kw">def</span> <span class="fn">merge_sort</span>(arr):
    <span class="kw">if</span> <span class="fn">len</span>(arr) &lt;= <span class="num">1</span>: <span class="kw">return</span> arr
    mid = <span class="fn">len</span>(arr) // <span class="num">2</span>
    L = <span class="fn">merge_sort</span>(arr[:mid])
    R = <span class="fn">merge_sort</span>(arr[mid:])
    res, i, j = [], <span class="num">0</span>, <span class="num">0</span>
    <span class="kw">while</span> i &lt; <span class="fn">len</span>(L) <span class="kw">and</span> j &lt; <span class="fn">len</span>(R):
        <span class="kw">if</span> L[i] &lt;= R[j]: res.<span class="fn">append</span>(L[i]); i+=<span class="num">1</span>
        <span class="kw">else</span>: res.<span class="fn">append</span>(R[j]); j+=<span class="num">1</span>
    <span class="kw">return</span> res + L[i:] + R[j:]`,
  },
  quick: {
    c: `<span class="kw">int</span> <span class="fn">partition</span>(<span class="kw">int</span> a[], <span class="kw">int</span> lo, <span class="kw">int</span> hi) {
  <span class="kw">int</span> pivot=a[hi], i=lo-<span class="num">1</span>;
  <span class="kw">for</span>(<span class="kw">int</span> j=lo;j&lt;hi;j++)
    <span class="kw">if</span>(a[j]&lt;=pivot){i++;int t=a[i];a[i]=a[j];a[j]=t;}
  <span class="kw">int</span> t=a[i+<span class="num">1</span>];a[i+<span class="num">1</span>]=a[hi];a[hi]=t;
  <span class="kw">return</span> i+<span class="num">1</span>;
}

<span class="kw">void</span> <span class="fn">quickSort</span>(<span class="kw">int</span> a[], <span class="kw">int</span> lo, <span class="kw">int</span> hi) {
  <span class="kw">if</span> (lo &lt; hi) {
    <span class="kw">int</span> pi = <span class="fn">partition</span>(a, lo, hi);
    <span class="fn">quickSort</span>(a, lo, pi-<span class="num">1</span>);
    <span class="fn">quickSort</span>(a, pi+<span class="num">1</span>, hi);
  }
}`,
    cpp: `<span class="kw">int</span> <span class="fn">partition</span>(<span class="tp">vector</span>&lt;<span class="kw">int</span>&gt;&amp; a, <span class="kw">int</span> lo, <span class="kw">int</span> hi) {
  <span class="kw">int</span> pivot=a[hi], i=lo-<span class="num">1</span>;
  <span class="kw">for</span>(<span class="kw">int</span> j=lo;j&lt;hi;j++)
    <span class="kw">if</span>(a[j]&lt;=pivot) <span class="fn">swap</span>(a[++i],a[j]);
  <span class="fn">swap</span>(a[i+<span class="num">1</span>],a[hi]);
  <span class="kw">return</span> i+<span class="num">1</span>;
}

<span class="kw">void</span> <span class="fn">quickSort</span>(<span class="tp">vector</span>&lt;<span class="kw">int</span>&gt;&amp; a, <span class="kw">int</span> lo, <span class="kw">int</span> hi) {
  <span class="kw">if</span> (lo &lt; hi) {
    <span class="kw">int</span> pi = <span class="fn">partition</span>(a,lo,hi);
    <span class="fn">quickSort</span>(a,lo,pi-<span class="num">1</span>);
    <span class="fn">quickSort</span>(a,pi+<span class="num">1</span>,hi);
  }
}`,
    java: `<span class="kw">public void</span> <span class="fn">quickSort</span>(<span class="kw">int</span>[] a, <span class="kw">int</span> lo, <span class="kw">int</span> hi) {
  <span class="kw">if</span> (lo &lt; hi) {
    <span class="kw">int</span> pi = <span class="fn">partition</span>(a, lo, hi);
    <span class="fn">quickSort</span>(a, lo, pi-<span class="num">1</span>);
    <span class="fn">quickSort</span>(a, pi+<span class="num">1</span>, hi);
  }
}

<span class="kw">int</span> <span class="fn">partition</span>(<span class="kw">int</span>[] a, <span class="kw">int</span> lo, <span class="kw">int</span> hi) {
  <span class="kw">int</span> pivot=a[hi], i=lo-<span class="num">1</span>;
  <span class="kw">for</span>(<span class="kw">int</span> j=lo;j&lt;hi;j++)
    <span class="kw">if</span>(a[j]&lt;=pivot){i++;int t=a[i];a[i]=a[j];a[j]=t;}
  <span class="kw">int</span> t=a[i+<span class="num">1</span>];a[i+<span class="num">1</span>]=a[hi];a[hi]=t;
  <span class="kw">return</span> i+<span class="num">1</span>;
}`,
    python: `<span class="kw">def</span> <span class="fn">quick_sort</span>(arr, lo, hi):
    <span class="kw">if</span> lo &lt; hi:
        pi = <span class="fn">partition</span>(arr, lo, hi)
        <span class="fn">quick_sort</span>(arr, lo, pi - <span class="num">1</span>)
        <span class="fn">quick_sort</span>(arr, pi + <span class="num">1</span>, hi)

<span class="kw">def</span> <span class="fn">partition</span>(arr, lo, hi):
    pivot, i = arr[hi], lo - <span class="num">1</span>
    <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(lo, hi):
        <span class="kw">if</span> arr[j] &lt;= pivot:
            i += <span class="num">1</span>
            arr[i],arr[j]=arr[j],arr[i]
    arr[i+<span class="num">1</span>],arr[hi]=arr[hi],arr[i+<span class="num">1</span>]
    <span class="kw">return</span> i + <span class="num">1</span>`,
  },
  counting: {
    c: `<span class="kw">void</span> <span class="fn">countingSort</span>(<span class="kw">int</span> arr[], <span class="kw">int</span> n) {
  <span class="kw">int</span> max=arr[<span class="num">0</span>];
  <span class="kw">for</span>(<span class="kw">int</span> i=<span class="num">1</span>;i&lt;n;i++) <span class="kw">if</span>(arr[i]&gt;max)max=arr[i];
  <span class="kw">int</span> cnt[max+<span class="num">1</span>];
  <span class="fn">memset</span>(cnt,<span class="num">0</span>,<span class="kw">sizeof</span>(cnt));
  <span class="kw">for</span>(<span class="kw">int</span> i=<span class="num">0</span>;i&lt;n;i++) cnt[arr[i]]++;
  <span class="kw">int</span> idx=<span class="num">0</span>;
  <span class="kw">for</span>(<span class="kw">int</span> v=<span class="num">0</span>;v&lt;=max;v++)
    <span class="kw">while</span>(cnt[v]--) arr[idx++]=v;
}`,
    cpp: `<span class="kw">void</span> <span class="fn">countingSort</span>(<span class="tp">vector</span>&lt;<span class="kw">int</span>&gt;&amp; arr) {
  <span class="kw">int</span> mx=*<span class="fn">max_element</span>(arr.<span class="fn">begin</span>(),arr.<span class="fn">end</span>());
  <span class="tp">vector</span>&lt;<span class="kw">int</span>&gt; cnt(mx+<span class="num">1</span>,<span class="num">0</span>);
  <span class="kw">for</span>(<span class="kw">int</span> x:arr) cnt[x]++;
  <span class="kw">int</span> idx=<span class="num">0</span>;
  <span class="kw">for</span>(<span class="kw">int</span> v=<span class="num">0</span>;v&lt;=mx;v++)
    <span class="kw">while</span>(cnt[v]--&gt;<span class="num">0</span>) arr[idx++]=v;
}`,
    java: `<span class="kw">public void</span> <span class="fn">countingSort</span>(<span class="kw">int</span>[] arr) {
  <span class="kw">int</span> max=Arrays.<span class="fn">stream</span>(arr).<span class="fn">max</span>().<span class="fn">getAsInt</span>();
  <span class="kw">int</span>[] cnt=<span class="kw">new int</span>[max+<span class="num">1</span>];
  <span class="kw">for</span>(<span class="kw">int</span> x:arr) cnt[x]++;
  <span class="kw">int</span> idx=<span class="num">0</span>;
  <span class="kw">for</span>(<span class="kw">int</span> v=<span class="num">0</span>;v&lt;=max;v++)
    <span class="kw">while</span>(cnt[v]--&gt;<span class="num">0</span>) arr[idx++]=v;
}`,
    python: `<span class="kw">def</span> <span class="fn">counting_sort</span>(arr):
    <span class="kw">if not</span> arr: <span class="kw">return</span> arr
    mx = <span class="fn">max</span>(arr)
    cnt = [<span class="num">0</span>] * (mx + <span class="num">1</span>)
    <span class="kw">for</span> x <span class="kw">in</span> arr: cnt[x] += <span class="num">1</span>
    idx = <span class="num">0</span>
    <span class="kw">for</span> v, c <span class="kw">in</span> <span class="fn">enumerate</span>(cnt):
        <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(c):
            arr[idx]=v; idx+=<span class="num">1</span>
    <span class="kw">return</span> arr`,
  },
};
