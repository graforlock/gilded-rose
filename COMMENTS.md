
My Comments on the exercise:

1. First, I looked at the existing code and came up with ways to make it more declarative rather than imperative (i.e. how it was). Nesting for loops in the original code was very hard to read.
2. I have started coding from creating jasmine unit tests and tearing the code apart until it was essentially refactored.
3. I have also updated the table part in TexttestFixture.html so it has more days
4. There is (maybe intentional) contradiction in instructions. For example, if sell_in (concert) date passes, rendering quality zero and if quality never becomes a negative number, then the instruction to "degrade quality twice as fast" past the concert date has no effect.
5. Regarding above, there was no mention in the instruction whether one should doubly increase the value past sell_in date so I have ignored this assumption.
6. I have decided not to split the parts of the `gilded_rose.js` into separate modules and left it in a single file, as it was.
7. The exercise took me a rather short time and I was trying to make it in under an hour, due to that I forgot to document clear git commit history.

Maciej

**ADDENDUM:**

In retrospection, it would be good (or better) to create model classes of each respective item type. Those would wrap existing Item class by composing the `item` in. In Typescript then, this can be neatly achieved via discriminated unions that could discriminate by using `type` property. Each class would have its own `updateItem` override. It would make code less concise, however, rather than employing a command-like updateItem pattern.

