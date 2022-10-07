describe('Number', () => {
  describe('Addition', () => {
    context('when all operands are numbers', () => {
      it('adds two positive numbers correctly', () => {
        expect(1 + 1).to.eq(2);
        expect(2 + 3).to.eq(5);
      });

      it('adds two negative numbers correctly', () => {
        expect(-1 + -1).to.eq(-2);
        expect(-2 + -3).to.eq(-5);
      });
    });

    context('when some operand is not number', () => {
      it('adds positive number and string correctly', () => {
        expect(1 + '1').to.eq('11');
        expect(2 + '3').to.eq('23');
      });

      it('adds negative number and string correctly', () => {
        expect(-1 + '-1').to.eq('-1-1');
        expect(-2 + '-3').to.eq('-2-3');
      });
    });
  });

  describe('Multiplication', () => {
    it('multiplies two positive numbers correctly', () => {
      expect(1 * 1).to.eq(1);
      expect(2 * 3).to.eq(6);
    });

    it('multiplies two negative numbers correctly', () => {
      expect(-1 * -1).to.eq(1);
      expect(-2 * -3).to.eq(6);
    });
  });
});
