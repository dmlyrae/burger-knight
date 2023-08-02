import { burgerActionsTypes, changeOrderIngredients } from './burgerActions'

describe('Action creators', () => {
  it('should create an action with correct indexes', () => {

    const expectedAction = {
      type: burgerActionsTypes.CHANGE_ORDER_INGREDIENTS,
      payload: {
        dragIndex: 1,
        dropIndex: 2
      }
    }
        
    expect(changeOrderIngredients(1, 2)).toEqual(expectedAction)

  })
}) 