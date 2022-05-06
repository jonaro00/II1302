import React from 'react'
import { Observable } from '../model/Observable'

/**
 * Custom hook that registers a model attribute or getter that the View is dependent on.
 * Registers an observer to recieve updates of the model attribute, and only re-renders
 * when this attribute changed.
 * @param {Observable} model An observable object.
 * @param {string} propertyName Attribute or getter method name in the model.
 * @returns The value of the model attribute (stateful).
 */
export default function useModelProperty(model: Observable, propertyName: string): any {
  const func = typeof model[propertyName] === 'function'
  // Use a state in the component
  const [value, setValue] = React.useState(func ? model[propertyName]() : model[propertyName])
  React.useEffect(() => {
    // The observer updates the local state
    const obs = () => setValue(func ? model[propertyName]() : model[propertyName])
    model.addObserver(obs) // subscribe
    return () => model.removeObserver(obs) // unsubscribe
  }, [func, model, propertyName])
  return value
}
