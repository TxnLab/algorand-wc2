import { classNames } from '@/utils'

export default function AlgoSymbol({ className = '', size = 'text-[70%]' }) {
  return <span className={classNames('font-algo relative -top-[1px]', size, className)}>A</span>
}
