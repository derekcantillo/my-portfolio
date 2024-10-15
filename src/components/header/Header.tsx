import { cn, routes } from 'lib'
import Link from 'next/link'
import React from 'react'

export const Header = (): JSX.Element => {
	return (
		<div className={cn('border flex justify-between', 'p-6 ')}>
			<Link href="/">
				<label>Derek</label>
			</Link>
			<div className={cn('flex gap-2')}>
				{routes.map(route => (
					<Link key={route.name} href={route.path}>
						<label className={cn('text-lg')}>{route.name}</label>
					</Link>
				))}
			</div>
			<div className=""></div>
		</div>
	)
}
