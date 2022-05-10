import { useField } from 'formik'

export const InputSelect = (
  props: React.InputHTMLAttributes<HTMLSelectElement>
) => {
  const [field, meta] = useField(props.name!)
  return (
    <div>
      <select
        className='w-full py-2 px-4 rounded outline-none appearance-none'
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className='mt-1 text-pink-600 text-sm'>{meta.error}</div>
      )}
    </div>
  )
}
