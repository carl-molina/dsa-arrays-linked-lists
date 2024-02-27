/** IndexError: raised when index not found. */

class IndexError extends Error {
}

/**
 * NodeStr: node for a singly-linked list of string.
 *
 * - val
 * - next: next NodeStr or null
 */

class NodeStr {
  val: string;
  next: NodeStr | null;

  constructor(val: string) {
    this.val = val;
    this.next = null;
  }
}

/**
 * Linked list of strings.
 */

class LLStr {
  head: NodeStr | null;
  tail: NodeStr | null;
  length: number;

  constructor(vals: string[] = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (const val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val: string): void {

    const newNode = new NodeStr(val);

    if (this.head === null) {
      this.head = newNode;
    }

    if (this.tail !== null) {
      this.tail.next = newNode;
    }

    this.length += 1;
    this.tail = newNode;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val: string): void {

    const newNode = new NodeStr(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;
  }

  /** pop(): return & remove last item.
   *
   * Throws IndexError on empty list.
   **/

  pop(): string {

    if (this.length === 0) throw new IndexError;

    let current = this.head;
    const lastNode = this.tail;

    while (current !== null) {
      if (current.next === lastNode) {
        current.next = null;
        this.tail = current;
        console.log('this.length:', this.length);
        this.length -= 1;
        console.log('this.length after minus 1:', this.length);
      } else if (current.next === null) {
        this.length -= 1;
        this.head = null;
        this.tail = null;
      }
      current = current.next;
    }

    return lastNode!.val;
  }

  /** shift(): return & remove first item.
   *
   * Throws IndexError on empty list.
   **/

  shift(): string {

    if (this.length === 0) throw new IndexError;

    //[a, b]
    const currFirstNode = this.head; //cfn=a //b
    const newHeadNode = currFirstNode!.next; //nhn = b //null
    if (newHeadNode === null) {
      this.head = null;
      this.tail = null;

    } else {
      this.head = newHeadNode; //head=b
      newHeadNode!.next = currFirstNode!.next!.next;

    }

    this.length -= 1;
    console.log('This is shift currFirstNode!.val', currFirstNode!.val);
    return currFirstNode!.val;
  }

  /** getAt(idx): get val at idx.
   *
   * Throws IndexError if not found.
   **/

  getAt(idx: number): string {

    if (this.length === 0) throw new IndexError;

    let startingIdx = 0;
    let current = this.head;

    while (current !== null) {
      if (startingIdx === idx) {
        return current.val;
      }
      current = current.next;
      startingIdx += 1;
    }

    throw new IndexError;

  }

  /** setAt(idx, val): set val at idx to val.
   *
   * Throws IndexError if not found.
   **/

  setAt(idx: number, val: string): void {

    if (this.length === 0) throw new IndexError;

    let startingIdx = 0;
    let current = this.head;

    while (current !== null) {
      if (startingIdx === idx) {
        current.val = val;
        return;
      }
      current = current.next;
      startingIdx += 1;
    }

    throw new IndexError;
  }

  /** insertAt(idx, val): add node w/val before idx.
   *
   * Throws IndexError if not found.
   **/

  insertAt(idx: number, val: string): void {
    //[a, 1, b]

    console.log('Top of insertAt method');

    if (idx > this.length || idx < 0) {
      throw new IndexError;
    }

    if (idx === 0) {
      this.unshift(val);
    } else if (idx === this.length) {
      this.push(val);
    } else {
      let startingIdx = 0;
      let current = this.head; //a //b

      while (current !== null) {

        console.log('Inside while loop');
        if ((startingIdx + 1) === idx) { //1

          console.log('Inside startingIdx+1 === idx');
          const newNode = new NodeStr(val);
          newNode.next = current.next!; //newNode.next = b
          current.next = newNode; //a -> 1
          debugger;
          // if(idx === this.length-1)
          this.length += 1;

        }
        current = current.next;
        startingIdx += 1;
      }
    }



  }

  /** removeAt(idx): return & remove item at idx,
   *
   * Throws IndexError if not found.
   **/

  removeAt(idx: number): string {

    console.log('Top of removeAt');

    if (this.length === 0) throw new IndexError;
    if (idx >= this.length || idx < 0) {
      throw new IndexError;
    }

    if (idx === 0) {
      return this.shift();
    } else {
      let startingIdx = 0;
      let current = this.head;

      while (current !== null) {

        if (idx === 0) {
          console.log('We got to index 0');
          const soughtNode = current;

          const newHead = current.next;
          this.head = newHead;

          console.log('soughtNode!.val:', soughtNode!.val);
          return soughtNode!.val!;
        }



        if ((startingIdx + 1) === idx) {

          const soughtNode = current.next;

          current.next = current.next!.next!;
          this.length -= 1;

          return soughtNode!.val!;
        }
        current = current.next;
        startingIdx += 1;
      }
    }

  }

  /** toArray (useful for tests!) */

  toArray(): string[] {
    const out = [];
    let current = this.head;

    while (current) {
      out.push(current.val);
      current = current.next;
    }

    return out;
  }
}


export {
  IndexError,
  LLStr,
  NodeStr,
};