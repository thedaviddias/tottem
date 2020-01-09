import classNames from 'classnames'
import FormSearch from '../../components/AddItemForm/FormSearch'
import FormURL from '../../components/AddItemForm/FormURL'
import {
    useAddItemReducer,
    useHotKeys,
} from '../../components/AddItemForm/hooks'
import { useItemFormSearch, useItemUrlForm } from './hooks'
import AddItemForm from '../../components/AddItemForm'
import { Fragment } from 'react'
import { GlobalHotKeys } from 'react-hotkeys'

export default ({
    collectionId,
    className,
}: {
    collectionId: string
    className?: string
}) => {
    const [state, dispatch] = useAddItemReducer()

    const useFormSearch = useItemFormSearch(
        state.searchElement || 'book',
        collectionId,
        () => dispatch('loading'),
        () => dispatch('completed')
    )

    const useFormURL = useItemUrlForm(
        collectionId,
        () => dispatch('loading'),
        () => dispatch('completed')
    )

    const { keyMap, handlers } = useHotKeys(dispatch)

    const FormItem =
        state.type === 'url' ? (
            <FormURL useForm={useFormURL} onClose={() => dispatch('close')} />
        ) : (
            (state.searchElement === 'book' ||
                state.searchElement === 'movie') && (
                <FormSearch
                    useForm={useFormSearch}
                    searchType={state.searchElement}
                    onClose={() => dispatch('close')}
                />
            )
        )

    return (
        <Fragment>
            <GlobalHotKeys keyMap={keyMap} handlers={handlers} />
            <AddItemForm
                FormItem={FormItem}
                dispatch={dispatch}
                className={classNames('relative h-8', className)}
                {...state}
            />
        </Fragment>
    )
}
