import { routes } from 'lib'
import Link from 'next/link'
import React from 'react'

export const Header = (): JSX.Element => {
	return (
		<div>
			{routes.map(route => (
				<Link key={route.name} href={route.path}>
					<label>{route.name}</label>
				</Link>
			))}
		</div>
	)
}
