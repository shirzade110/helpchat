//
//  HostingController.swift
//  helpchatWatch Extension
//
//  Created by Sam YazdanParast on 5/4/21.
//

import WatchKit
import Foundation
import SwiftUI

class HostingController: WKHostingController<LoginView> {
    override var body: LoginView {
        return LoginView()
    }
}

